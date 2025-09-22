#!/bin/bash

# Rock-solid PDF addition process
# Usage: ./add-pdf.sh "source_path" "display_name"

if [ $# -ne 2 ]; then
    echo "Usage: $0 'source_path' 'display_name'"
    echo "Example: $0 '/path/to/file.pdf' 'PO1234-BU01-001.pdf'"
    exit 1
fi

SOURCE_PATH="$1"
DISPLAY_NAME="$2"
PUBLIC_DIR="/Users/nessiii/my-saas-platform/ets-pdf-parser-test/public/pdfs"

# Check if source file exists
if [ ! -f "$SOURCE_PATH" ]; then
    echo "❌ Error: Source file does not exist: $SOURCE_PATH"
    exit 1
fi

# Check if public directory exists
if [ ! -d "$PUBLIC_DIR" ]; then
    echo "❌ Error: Public directory does not exist: $PUBLIC_DIR"
    exit 1
fi

# Copy the file
echo "📁 Copying PDF to public directory..."
cp "$SOURCE_PATH" "$PUBLIC_DIR/$DISPLAY_NAME"

if [ $? -eq 0 ]; then
    echo "✅ Successfully copied: $DISPLAY_NAME"

    # Test accessibility
    URL_ENCODED_NAME=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$DISPLAY_NAME'))")
    TEST_URL="http://localhost:8080/pdfs/$URL_ENCODED_NAME"

    echo "🌐 Testing accessibility at: $TEST_URL"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$TEST_URL")

    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ PDF is accessible via HTTP server"
        echo "📋 Add this URL to your mock data: $TEST_URL"
    else
        echo "❌ Error: PDF not accessible (HTTP $HTTP_CODE)"
        echo "💡 Make sure the local server is running: python3 -m http.server 8080"
        exit 1
    fi

    echo ""
    echo "🎯 Next steps:"
    echo "1. Add PDF entry to mock data with originalUrl: '$TEST_URL'"
    echo "2. Update parsedFields with extracted content"
    echo "3. Test in browser to ensure everything works"

else
    echo "❌ Error: Failed to copy file"
    exit 1
fi
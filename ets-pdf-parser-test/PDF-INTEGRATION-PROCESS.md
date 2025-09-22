# 🔒 Rock-Solid PDF Integration Process

## ⚠️ CRITICAL: This process MUST be followed for every PDF addition

### 1. File Preparation
```bash
# Use the automated script to ensure rock-solid integration
./add-pdf.sh "/path/to/source/file.pdf" "display-name.pdf"
```

### 2. Verification Checklist
- [ ] PDF file copied to `/public/pdfs/`
- [ ] File accessible via HTTP server (returns 200 OK)
- [ ] URL-encoded filename works in browser
- [ ] Local server is running on port 8080

### 3. Mock Data Integration
- [ ] Add PDF entry with correct `originalUrl`
- [ ] Include all required fields in `parsedFields`
- [ ] Test PDF viewer loads without 404 errors
- [ ] Verify all sections display correctly

### 4. Testing Requirements
- [ ] PDF displays in viewer
- [ ] All text content shows correctly
- [ ] Quick Review sections adapt to content length
- [ ] Time constraints display accurately
- [ ] Job summaries include document type prefix

## 🚫 Never Skip These Steps

1. **Always copy files first** - Don't add mock data without accessible files
2. **Always test HTTP accessibility** - Use curl or browser to verify
3. **Always use URL encoding** - Spaces and special chars must be encoded
4. **Always verify server is running** - Check `http://localhost:8080/pdfs/`

## 🆘 Troubleshooting

### PDF Not Found (404)
- Check file exists: `ls -la public/pdfs/`
- Verify server running: `python3 -m http.server 8080`
- Test URL encoding: Use browser developer tools

### Server Issues
- Restart server: `cd public && python3 -m http.server 8080`
- Check port conflicts: `lsof -i :8080`
- Verify permissions: `chmod 644 public/pdfs/*.pdf`

## 📝 File Naming Convention
- Use original PDF names when possible
- URL-encode spaces as `%20` in mock data
- Keep extensions as `.pdf`
- Avoid special characters if possible

---
**🎯 Goal: Zero 404 errors, 100% reliability**
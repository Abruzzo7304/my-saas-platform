export interface Database {
  public: {
    Tables: {
      subcontractors: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone?: string;
          mobile?: string;
          abn?: string;
          business_name?: string;
          is_approved: boolean;
          approval_date?: string;
          compliance_status?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subcontractors']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['subcontractors']['Insert']>;
      };
      
      certification_types: {
        Row: {
          id: string;
          name: string;
          category: string;
          requires_renewal: boolean;
          default_validity_years?: number;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['certification_types']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['certification_types']['Insert']>;
      };
      
      licenses_certifications: {
        Row: {
          id: string;
          subcontractor_id: string;
          certification_type_id: string;
          license_number?: string;
          issue_date?: string;
          expiry_date?: string;
          status_id?: string;
          issuing_authority_id?: string;
          file_url?: string;
          file_name?: string;
          notes?: string;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['licenses_certifications']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['licenses_certifications']['Insert']>;
      };
      
      jobs: {
        Row: {
          id: string;
          title: string;
          description: string;
          location: string;
          estimated_value?: number;
          urgency?: string;
          status?: string;
          assigned_to?: string;
          requires_jsa: boolean;
          requires_swms: boolean;
          due_date?: string;
          servicem8_id?: string;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>;
      };
      
      issuing_authorities: {
        Row: {
          id: string;
          name: string;
          abbreviation?: string;
          jurisdiction?: string;
          is_active: boolean;
          created_at: string;
        };
      };
      
      certification_status_types: {
        Row: {
          id: string;
          name: string;
          color_code?: string;
          requires_action: boolean;
          sort_order: number;
        };
      };
    };
  };
}

// Helper types for easier use
export type Subcontractor = Database['public']['Tables']['subcontractors']['Row'];
export type Job = Database['public']['Tables']['jobs']['Row'];
export type CertificationType = Database['public']['Tables']['certification_types']['Row'];
export type LicenseCertification = Database['public']['Tables']['licenses_certifications']['Row'];
export type IssuingAuthority = Database['public']['Tables']['issuing_authorities']['Row'];
export type CertificationStatus = Database['public']['Tables']['certification_status_types']['Row'];

// Insert/Update types
export type SubcontractorInsert = Database['public']['Tables']['subcontractors']['Insert'];
export type JobInsert = Database['public']['Tables']['jobs']['Insert'];
export type LicenseCertificationInsert = Database['public']['Tables']['licenses_certifications']['Insert'];
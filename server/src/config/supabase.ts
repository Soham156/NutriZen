import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set');
  process.exit(1);
}

console.log('🔌 Connecting to Supabase via HTTPS...');

// Create Supabase client (works through HTTPS - port 443)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Test connection
(async () => {
  try {
    const { error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('⚠️  Supabase connection test - table may not exist yet');
      console.log('   Run the SQL migrations to create tables');
    } else {
      console.log('✅ Connected to Supabase successfully via HTTPS');
    }
  } catch (err: any) {
    console.error('❌ Supabase connection failed:', err.message);
  }
})();

// Helper function for compatibility (not used with Supabase client)
export const query = async (_text: string, _params?: any[]) => {
  throw new Error('Use Supabase query builder instead of raw SQL');
};

export default supabase;

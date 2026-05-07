// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export async function getData(tableName, selectQuery = '*') {
//   const { data, error } = await supabase
//     .from(tableName)
//     .select(selectQuery);

//   if (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }

//   return data;
// }
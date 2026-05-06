import postgres from 'postgres'

const connectionString = "postgresql://postgres.wrstttfxbyewsycdbekm:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"
const sql = postgres(connectionString)

export default sql
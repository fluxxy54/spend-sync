// app/api/transactions/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '../../../utils/supabase/server'

export async function GET() {
  // 1. Initialize the Supabase connection
  const supabase = await createClient()

  // 2. Execute the query (This performs a JOIN on the Categories table)
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      id,
      amount,
      date,
      description,
      categories ( name, color_hex )
    `)
    .order('date', { ascending: false })

  // 3. Handle errors
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // 4. Return the formatted JSON payload to your Client Components
  return NextResponse.json({ transactions: data })
}
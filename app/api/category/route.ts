import { NextResponse } from 'next/server'
import { createClient } from '../../../utils/supabase/server'

export async function GET() {
  // 1. Initialize the Supabase connection
  const supabase = await createClient()

  // 2. Execute the query (This performs a JOIN on the Categories table)
const {data,error} = await supabase.rpc('get_category_total')

  // const { data, error } = await supabase
  //   .from('categories')
  //   .select(`
  //     id,
  //     name,
  //     type,
  //     color_hex,
  //     transactions ( id, amount, date )
  //   `)
  //   .order('type', { ascending: false })
    
    
  // 3. Handle errors
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // 4. Return the formatted JSON payload to your Client Components
  return NextResponse.json({ transactions: data })
}
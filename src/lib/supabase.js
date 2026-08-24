import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xhkgxxmevcufmnsnxcwi.supabase.co'
const supabaseKey = 'sb_publishable_Dca9A5hM9U3v_xoYSmPXWQ_NXb2XVZo'

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function registerUser(telegramId, name, phone) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ telegram_id: telegramId, name, phone }, { onConflict: 'telegram_id' })
    .select()
  return { data, error }
}

export async function getUser(telegramId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('telegram_id', telegramId)
    .single()
  return { data, error }
}

export async function createOrder(telegramId, items, total, address, comment, payment) {
  const { data, error } = await supabase
    .from('orders')
    .insert({ telegram_id: telegramId, items, total, address, comment, payment })
    .select()
  return { data, error }
}

export async function getOrders(telegramId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('telegram_id', telegramId)
    .order('created_at', { ascending: false })
  return { data, error }
}

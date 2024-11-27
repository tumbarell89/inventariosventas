import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcrypt'

//const supabaseUrl = 'https://zlgdsntiqwresonrzzsc.supabase.co'
//const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZ2RzbnRpcXdyZXNvbnJ6enNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMDI4ODcsImV4cCI6MjA0MzY3ODg4N30.6Jn_9bzI-4szpHk9j6ja1mnD7BxvvT3yGRdxvGAR4NU'

const supabase = createClient('https://zlgdsntiqwresonrzzsc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZ2RzbnRpcXdyZXNvbnJ6enNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMDI4ODcsImV4cCI6MjA0MzY3ODg4N30.6Jn_9bzI-4szpHk9j6ja1mnD7BxvvT3yGRdxvGAR4NU');

async function updatePasswords() {
  // Fetch all users
  const { data: users, error } = await supabase
    .from('usuarios')
    .select('id, telefono, contrasena');

  if (error) {
    console.error('Error fetching users:', error)
    return
  }

  for (const user of users) {
    try {
      // Hash the plain text password
      const hashedPassword = await bcrypt.hash(user.contrasena, 10)

      // Update the user's password in the database
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ contrasena: hashedPassword })
        .eq('id', user.id)

      if (updateError) {
        console.error(`Error updating password for user ${user.telefono}:`, updateError)
      } else {
        console.debug(`Updated password for user ${user.telefono}`)
      }
    } catch (err) {
      console.error(`Error processing user ${user.telefono}:`, err)
    }
  }

  console.debug('Password update process completed')
}

updatePasswords()
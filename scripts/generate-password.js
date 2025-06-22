const bcrypt = require('bcryptjs')

async function generatePassword() {
  const passwords = [
    { user: 'admin', password: 'admin123' },
    { user: 'testuser', password: 'test123' }
  ]

  console.log('🔐 Generated Password Hashes:')
  console.log('================================')

  for (const { user, password } of passwords) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    console.log(`User: ${user}`)
    console.log(`Plain Password: ${password}`)
    console.log(`Hashed Password: ${hashedPassword}`)
    console.log('--------------------------------')
  }

  console.log('\n📋 Login Information:')
  console.log('Admin User:')
  console.log('  Username: admin')
  console.log('  Password: admin123')
  console.log('')
  console.log('Test User:')
  console.log('  Username: testuser')
  console.log('  Password: test123')
}

generatePassword().catch(console.error) 
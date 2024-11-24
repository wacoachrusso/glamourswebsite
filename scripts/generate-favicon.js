import sharp from 'sharp';

// Create a 32x32 favicon from the logo
sharp('public/images/logo.png')
  .resize(32, 32)
  .toFile('public/favicon.ico')
  .then(() => console.log('Favicon generated successfully!'))
  .catch(err => console.error('Error generating favicon:', err));
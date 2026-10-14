import crypto from 'crypto';

// Define the encryption key and initialization vector (IV).
// The key must be 32 bytes for AES-256.
const ENCRYPTION_KEY = (process.env.ENCRYPTION_KEY ||
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY) as string;
const IV_LENGTH = 16;

// Encrypt function
export const encrypt = <T>(data: T): { iv: string; data: string } => {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not defined');
  }

  try {
    const iv = crypto.randomBytes(IV_LENGTH); // Generate a random IV for each encryption
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );

    const stringifiedData =
      typeof data === 'string' ? data : JSON.stringify(data);

    let encrypted = cipher.update(stringifiedData, 'utf-8', 'base64');
    encrypted += cipher.final('base64');

    // Return the IV and encrypted data as Base64-encoded strings
    return {
      iv: iv.toString('base64'),
      data: encrypted,
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error}`);
  }
};

// Decrypt function
export const decrypt = <T>(encryptedPayload: {
  iv: string;
  data: string;
}): T => {
  try {
    if (!ENCRYPTION_KEY) {
      throw new Error('ENCRYPTION_KEY is not defined');
    }
    // Decode Base64 IV and data
    const iv = Buffer.from(encryptedPayload.iv, 'base64');
    const encryptedData = Buffer.from(encryptedPayload.data, 'base64');

    if (iv.length !== 16) {
      throw new Error('Invalid IV length');
    }

    // Create decipher
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );

    // Decrypt the data
    let decrypted = decipher.update(encryptedData, undefined, 'utf-8');
    decrypted += decipher.final('utf-8');

    // Parse decrypted JSON string
    return JSON.parse(decrypted) as T;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error(`Decryption failed: ${error}`);
  }
};

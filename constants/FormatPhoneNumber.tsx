export const formatPhoneNumber = (phone: string): string => {
  // Menghapus karakter yang tidak perlu
  const cleaned = phone.replace(/\D/g, ""); // Menghapus semua karakter non-digit
  // Menambahkan kode negara Indonesia (62) jika belum ada
  if (cleaned.startsWith("0")) {
    return `+62${cleaned.slice(1)}`; // Mengganti 0 dengan +62
  }
  return `+62${cleaned}`; // Menambahkan +62 di depan
};

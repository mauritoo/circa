export const formatTime = (text: String) => {
  if (!text) return '';
  try {
    const parts = text.split(' ');
    if (parts.length > 1) {
      const horaPartida = parts[0].split(':');
      if (parts[1] === 'PM' && parseInt(horaPartida[0]) < 12) {
        horaPartida[0] = String(parseInt(horaPartida[0]) + 12);
      }
      parts[0] = horaPartida[0] + ':' + horaPartida[1];
    }
    return parts[0];
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

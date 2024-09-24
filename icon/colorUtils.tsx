export const getColor = (color: string): string => {
  switch (color) {
    case 'neutral-400':
      return '#94A3B8';
    case 'neutral-500':
      return '#64748B';
    case 'neutral-800':
      return '#1E293B';
    case 'red-500':
      return '#F43F5E';
    case 'red-800':
      return '#730D29';
    case 'primary-500':
      return '#4871F7';
    case 'primary-800':
      return '#223B8C';
    case 'yellow-500':
      return '#F9B42D';
    case 'white':
      return '#FFFFFF';
    default:
      return '#4871F7';
  }
};

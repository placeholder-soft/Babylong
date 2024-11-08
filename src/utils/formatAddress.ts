export const getEllipsisAddress = (address?: string | null) => {
  if (address == null || address.length <= 8) return address;
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
};

export const googleMapLink = (lat: number, lng: number, address: string) => {
  return `https://www.google.com/maps/place/${address}/@${lat},${lng}z`
}
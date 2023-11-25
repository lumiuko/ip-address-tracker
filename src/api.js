const token = import.meta.env.VITE_APP_IPIFY_TOKEN

export async function fetchIp(address = '') {
  const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${token}&ipAddress=${address}`)

  if (!res.ok) throw new Error(res.statusText)

  const data = await res.json()
  const location = [data.location.city, data.location.region, data.location.country].filter(value => value).join(', ')

  return {
    info: {
      ip: data.ip,
      location,
      timezone: `UTC ${data.location.timezone}`,
      isp: data.as?.name ?? '-'
    },
    coords: {
      lat: data.location.lat,
      lng: data.location.lng
    }
  }
}

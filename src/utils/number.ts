export function formatUnits(
  value: string | number = "0",
  decimals: number = 18,
): string {
  const factor = BigInt(10 ** decimals)
  const weiValue = BigInt(value.toString())
  const formattedValue = weiValue / factor
  const remainder = weiValue % factor

  const decimalPart = remainder
    .toString()
    .padStart(decimals, "0")
    .slice(0, decimals)
  const integerPart = formattedValue.toString()

  return `${integerPart}.${decimalPart}`
}

export function parseUnits(value: string, decimals: number = 18): string {
  const [integerPart, decimalPart = ""] = value.split(".")
  const factor = BigInt(10 ** decimals)
  const integerValue = BigInt(integerPart || "0")

  const decimalValue = BigInt(
    decimalPart.padEnd(decimals, "0").slice(0, decimals),
  )

  return (integerValue * factor + decimalValue).toString()
}

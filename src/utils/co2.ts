/**
 * IPCC standard estimate: 21.77 kg CO₂ absorbed per tree per year,
 * averaged over a 10-year growth horizon.
 */
const CO2_KG_PER_TREE_PER_YEAR = 21.77
const CO2_HORIZON_YEARS = 10

export function calculateCo2OffsetKg(treesPlanted: number): number {
  return treesPlanted * CO2_KG_PER_TREE_PER_YEAR * CO2_HORIZON_YEARS
}

export function formatCo2(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}k`
  }  
  return kg.toFixed(0)
}
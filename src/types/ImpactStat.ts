import { ElementType } from "react"

export interface ImpactStat {
  label: string
  value: string | number
  helpText?: string
  trend?: 'increase' | 'decrease'
  icon: ElementType
}
"use client"

import type React from "react"
import type { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form"

type TechSelectionProps = {
  label: string
  options: string[]
  selected: string[]
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  name: string
  icon?: React.ReactNode
}

const TechSelection: React.FC<TechSelectionProps> = ({ label, options, selected, register, setValue, name, icon }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-2">
        {icon && <span className="mr-2 text-gray-500">{icon}</span>}
        <h3 className="font-medium">{label}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {options.map((tech) => (
          <label key={tech} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-black focus:ring-black"
              value={tech}
              {...register(name)}
              checked={selected.includes(tech)}
              onChange={(e) => {
                const newValues = e.target.checked ? [...selected, tech] : selected.filter((t) => t !== tech)
                setValue(name, newValues)
              }}
            />
            <span className="text-sm">{tech}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TechSelection


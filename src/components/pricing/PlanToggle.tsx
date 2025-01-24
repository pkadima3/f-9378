import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface PlanToggleProps {
  isYearly: boolean
  onToggle: (checked: boolean) => void
}

export function PlanToggle({ isYearly, onToggle }: PlanToggleProps) {
  return (
    <div className="flex flex-col items-center space-y-4 mb-12">
      <div className="flex items-center space-x-4 justify-center">
        <Label 
          htmlFor="billing-toggle" 
          className={cn(
            "text-sm font-medium transition-colors",
            !isYearly ? "text-primary" : "text-muted-foreground"
          )}
        >
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-primary"
        />
        <Label 
          htmlFor="billing-toggle" 
          className={cn(
            "text-sm font-medium transition-colors",
            isYearly ? "text-primary" : "text-muted-foreground"
          )}
        >
          Yearly
        </Label>
      </div>
      {isYearly && (
        <span className="text-sm text-green-600 dark:text-green-400 animate-fade-up">
          Save up to 50% with yearly billing
        </span>
      )}
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

interface PlanCardProps {
  title: string
  price: string
  description: string
  features: string[]
  savings?: string
  buttonText: string
  buttonVariant?: "default" | "outline" | "secondary"
  note?: string
  onSelect: () => void
}

export function PlanCard({
  title,
  price,
  description,
  features,
  savings,
  buttonText,
  buttonVariant = "default",
  note,
  onSelect
}: PlanCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-none">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <span className="text-4xl font-bold">{price}</span>
        </div>
        {savings && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {savings}
          </p>
        )}
        <ul className="space-y-2.5">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-none">
        <div className="w-full space-y-4">
          <Button
            variant={buttonVariant}
            className="w-full"
            onClick={onSelect}
          >
            {buttonText}
          </Button>
          {note && (
            <p className="text-xs text-muted-foreground text-center">
              {note}
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
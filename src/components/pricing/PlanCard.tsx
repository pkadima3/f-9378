import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import { cn } from "@/lib/utils"

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
  isPopular?: boolean
  highlightFeature?: string
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
  onSelect,
  isPopular,
  highlightFeature
}: PlanCardProps) {
  return (
    <Card className={cn(
      "relative flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
      isPopular && "border-primary shadow-md"
    )}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
            <Star className="h-4 w-4" /> Most Popular
          </span>
        </div>
      )}
      
      <CardHeader className="flex-none space-y-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
        {highlightFeature && (
          <p className="text-sm font-medium text-primary">{highlightFeature}</p>
        )}
      </CardHeader>

      <CardContent className="flex-grow space-y-6">
        <div className="space-y-2">
          <span className="text-4xl font-bold">{price}</span>
          {savings && (
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              {savings}
            </p>
          )}
        </div>

        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex-none pt-6">
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
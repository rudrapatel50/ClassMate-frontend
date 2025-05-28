import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "2 free Projects",
      "Task tracking",
      "Team collaboration",
      "Basic support"
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$4.99/mo",
    features: [
      "Everything in Free",
      "Advanced analytics",
      "Priority support",
      "Custom branding"
    ],
    cta: "Upgrade",
    highlight: true,
  },
];

const PricingSection = () => (
  <section id="pricing" className="max-w-6xl mx-auto w-full px-4 py-16">
    <h2 className="text-3xl font-extrabold text-center mb-4">Pricing</h2>
    <p className="text-center text-gray-600 mb-12">
      Simple, transparent pricing. No hidden fees.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {plans.map((plan, idx) => (
        <Card key={plan.name} className={plan.highlight ? "border-2 border-primary-600 shadow-lg" : ""}>
          <CardHeader>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <div className="text-3xl font-bold mt-2">{plan.price}</div>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2">
              {plan.features.map((f, i) => (
                <li key={i} className="text-gray-700 flex items-center gap-2">
                  <span className="text-primary-600">•</span> {f}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
              {plan.cta}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default PricingSection; 
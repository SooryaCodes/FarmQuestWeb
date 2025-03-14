import { Leaf, BarChart2, Shield, Clock } from "lucide-react";

export const FeatureHighlights = () => {
  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-white" />,
      title: "Crop Management",
      description: "Track growth cycles and optimize planting schedules"
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-white" />,
      title: "Yield Analytics",
      description: "Data-driven insights to maximize your farm's productivity"
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Secure Platform",
      description: "Enterprise-grade security for your farm's valuable data"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Real-time Updates",
      description: "Instant notifications and live monitoring capabilities"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-8 w-full max-w-lg mb-12">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start space-x-3 group">
          <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-white/40 transition-all shadow-sm">
            {feature.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-sm text-white/90 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}; 
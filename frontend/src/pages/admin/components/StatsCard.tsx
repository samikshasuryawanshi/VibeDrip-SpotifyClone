import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
    icon: React.ElementType;
    label: string;
    value: string;
    bgColor: string;
    iconColor: string;
}
const StatsCard = ({bgColor,icon:Icon,iconColor,label,value}:StatsCardProps) => {

  return <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">

    <CardContent>
        <div className="flex items-center gap-4">
            <div className={`rounded-full ${bgColor} p-3`}>
                <Icon className={`${iconColor} size-7`}/>
            </div>

            <div>
                <p className="text-medium text-zinc-400">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>


    </CardContent>

  </Card>
}

export default StatsCard
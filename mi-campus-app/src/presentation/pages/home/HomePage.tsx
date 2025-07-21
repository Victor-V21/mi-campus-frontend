import { Title } from "../../components/shared/Title"
import { Loader } from "../../components/shared/Loader"
import { useStatistics } from "../../hooks/useStatistics"

export const HomePage = () => {

const { data, isLoading } = useStatistics();

if(isLoading) {
    return <Loader />
}

console.log(data);


return (
    <div>
    <Title text="Página de Inicio" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    </div>
    </div>
)
}

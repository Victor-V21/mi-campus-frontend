import { Loader } from "../../components/shared/Loader";
import { useStatistics } from "../../hooks/useStatistics";

export const HomePage = () => {
    
const { data, isLoading } = useStatistics();

if(isLoading) {
    return <Loader />
}

console.log(data);

return(
<div>
    <h1>Home Page</h1>
</div>   
)
};
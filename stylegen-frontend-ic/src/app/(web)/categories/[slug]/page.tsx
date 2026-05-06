'use client'
import { useParams } from "next/navigation"

const CategoriesDetailsPage = () => {
    const params = useParams()

    return (
        <div className="text-center">
            {params.slug}
        </div>
    )
}

export default CategoriesDetailsPage
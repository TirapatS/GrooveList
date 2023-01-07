
const CardList = ({ data }) => {
    console.log(data)
    return (
        <>
            <div className="bg-GLblack rounded-lg shadow-md mb-[200px]">
                <div className="grid laptop:grid-rows-4 laptop:grid-flow-col gap-4 grid-rows-5 grid-flow-col p-2 laptop:p-0">
                    {data.categories.items.map((item) => {
                        return (
                            <div className="my-3 laptop:w-[120px] w-[69px]" key={item.id}>
                                <img className="rounded-lg hover:p-1" src={item.icons?.[0].url} title={item.name}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CardList
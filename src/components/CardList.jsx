
const CardList = ({ data, handleClick }) => {    

    return (
        <>
            <div className="bg-GLblack rounded-lg mb-[20px] laptop:mb-[0px]">
                <div className="grid laptop:grid-rows-4 laptop:grid-flow-col gap-4 grid-rows-4 grid-cols-4 p-2 laptop:p-0">
                    {data.items.map((item, idx) => {
                        return (
                            <div onClick={() => handleClick(item.id)} className="my-3 laptop:w-[120px] w-[69px]" key={idx}>
                                {
                                    (item.icons?.[0].url) ? <img className="rounded-lg hover:p-1" src={item.icons?.[0].url} title={item.name}/> 
                                    :
                                    <img className="rounded-lg hover:p-1" src={item.images?.[0].url} title={item.name}/>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CardList
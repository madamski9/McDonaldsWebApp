"use client"

export default function PokemonStats({ stats }) {
    if (!stats || stats.length === 0) {
        return <p>Loading stats...</p>
    }

    return (
        <div className="main">
            <section className="pokemon-details">
                <h4>Base Stats</h4>
                {stats.map((statInfo, index) => (
                    <p key={index}>
                        <strong>{statInfo.stat.name.replace('-', ' ')}:</strong> {statInfo.base_stat}
                    </p>
                ))}
            </section>
        </div>
    )
}

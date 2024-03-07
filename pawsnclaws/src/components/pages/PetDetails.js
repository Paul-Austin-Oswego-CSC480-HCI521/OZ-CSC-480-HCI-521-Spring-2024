import React from "react";
import ResponsiveCarousel from "../ResponsiveCarousel";
import './petDetails.css';


export const PetDetails = () => {

    const pets = [
        { image: 'https://cdn.discordapp.com/attachments/1207755289814900816/1209258814910636032/IMG_1480.jpeg?ex=65ef7f88&is=65dd0a88&hm=4a1a0469c7c34864096d4cda7218b27e0463a42dd37382371ecae97870489fab&', name: 'Pet Name 1' },
        { image: 'https://cdn.discordapp.com/attachments/1207755289814900816/1208190302716690503/IMG_1956.jpg?ex=65eb9c67&is=65d92767&hm=028e033fd6fdacf605c06edd6ed0bef5936a98efee9fc84b1e87d0f347a9a41b&', name: 'Pet Name 2' },
        { image: 'https://cdn.discordapp.com/attachments/1207755289814900816/1207828514657542154/IMG_20231101_174349_01.jpg?ex=65ea4b76&is=65d7d676&hm=1bb531e1d6afd1252e48318d575a31711cb79560dbd01c4a21bf0ba7afbebe8c&', name: 'Pet Name 3' },
        { image: 'https://cdn.discordapp.com/attachments/1207755289814900816/1207757842828890172/lucy2.jpg?ex=65ea09a4&is=65d794a4&hm=efa73834ff798ec809b38dc95764cbf4fe6644450a45539b8c18a3a415f41a23&', name: 'Pet Name 4' },
        // Add more pets as needed
    ];

    return (
        <div>
            <div className="displayImages">
                <img src="https://cdn.discordapp.com/attachments/1207755289814900816/1211881973941800991/B1C42F45-5655-44F2-8389-5A1A16AC7ED2.jpg?ex=65efd00a&is=65dd5b0a&hm=aa901a3acfb24b9db96b4e6f27e25f9b6a58c618367498ecfe76e382614cd272&" alt="Jak Jax"></img>
            </div>
            PET DETAILS
            <ResponsiveCarousel items={pets} />
        </div>
        
    )
}
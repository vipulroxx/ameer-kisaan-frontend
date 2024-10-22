import React, { useState } from 'react';
import './SoilMapDialog.css'; // Make sure to include your CSS styles

const SoilPopup = ({isOpenButton}) => {
    const [isOpen, setIsOpen] = useState(isOpenButton);

    const soilData = {
        "Sandy Soil": {
            description: "Sandy soil is light, warm, dry, and tends to be acidic and low in nutrients. Quick drainage but can dry out quickly in summer.",
            traits: ["Light", "Quick draining", "Low nutrients"],
        },
        "Clay Soil": {
            description: "Clay soil is heavy and rich in nutrients but drains slowly. Tends to dry out in summer and can crack.",
            traits: ["High nutrients", "Poor drainage", "Cracks in summer"],
        },
        "Silt Soil": {
            description: "Silt soil retains moisture well and has high fertility. However, it can be easily compacted.",
            traits: ["Moisture-retentive", "High fertility", "Prone to washing away"],
        },
        "Peat Soil": {
            description: "Peat soil is high in organic matter and retains moisture, often imported for planting.",
            traits: ["High organic matter", "Retains moisture"],
        },
        "Chalk Soil": {
            description: "Chalk soil is highly alkaline and may not support acid-loving plants.",
            traits: ["Alkaline", "May show white lumps"],
        },
        "Loam Soil": {
            description: "Loam is a mixture of sand, silt, and clay, ideal for most plants and well-draining.",
            traits: ["Fertile", "Good drainage", "Easy to work with"],
        },
        // Indian Soil Types
        "Alluvial Soil": {
            description: "Found in northern plains, rich in potash, and supports crops like wheat and maize.",
            traits: ["Fertile", "Varies from sandy loam to clay"],
        },
        "Black Soil": {
            description: "Found in Deccan Plateau, clayey and rich in iron; ideal for cotton.",
            traits: ["Moisture-retaining", "Rich in iron"],
        },
        "Red and Yellow Soil": {
            description: "Located in the Deccan Plateau, rich in iron but generally less fertile.",
            traits: ["Deficient in nitrogen", "Supports millets and oilseeds"],
        },
        "Laterite Soil": {
            description: "Typical of monsoon climates; low in fertility but suitable for cashew cultivation.",
            traits: ["Rich in iron and aluminum", "Responsive to fertilizers"],
        },
        "Mountain Soil": {
            description: "Found in forested areas, varies in texture; fertile in lower valleys.",
            traits: ["Acidic in snowbound areas", "Fertile in lower regions"],
        },
        "Peaty and Marshy Soil": {
            description: "Found in heavy rainfall regions, rich in organic matter.",
            traits: ["Heavy and black", "Supports vegetation"],
        },
        "Desert Soil": {
            description: "Sandy and low moisture; found in western Rajasthan.",
            traits: ["Saline", "Low water retention"],
        },
        "Saline and Alkaline Soil": {
            description: "High in salts, mainly found in arid regions.",
            traits: ["Infertile", "Requires reclamation"],
        },
    };

    const handleChipClick = (type) => {
        const soilInfo = soilData[type];
        alert(`Clicked on ${type}:\nDescription: ${soilInfo.description}\nTraits: ${soilInfo.traits.join(', ')}`);
    };

    return (
        <>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                        <h2>Soil Types</h2>
                        <p>Soil is a natural resource categorized into different types, each with distinct characteristics.</p>
                        <div className="soil-types">
                            {Object.keys(soilData).map((type) => (
                                <span
                                    key={type}
                                    className="soil-chip"
                                    onClick={() => handleChipClick(type)}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SoilPopup;

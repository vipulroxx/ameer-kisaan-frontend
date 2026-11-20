import React, { useState } from 'react';
import './SoilMapDialog.css';

const SoilPopup = ({ isOpen, onClose }) => {
	const [selectedSoilType, setSelectedSoilType] = useState(null);
	const soilData = {
			"Sandy Soil": {
					description: "Sandy soil is light, warm, dry, and tends to be acidic and low in nutrients. Quick drainage but can dry out quickly in summer.",
					traits: ["Light", "Quick draining", "Low nutrients"],
					color: "#e8c98a",
					textColor: "#3d2c12",
			},
			"Clay Soil": {
					description: "Clay soil is heavy and rich in nutrients but drains slowly. Tends to dry out in summer and can crack.",
					traits: ["High nutrients", "Poor drainage", "Cracks in summer"],
					color: "#b86f4b",
					textColor: "#ffffff",
			},
			"Silt Soil": {
					description: "Silt soil retains moisture well and has high fertility. However, it can be easily compacted.",
					traits: ["Moisture-retentive", "High fertility", "Prone to washing away"],
					color: "#b39a69",
					textColor: "#302410",
			},
			"Peat Soil": {
					description: "Peat soil is high in organic matter and retains moisture, often imported for planting.",
					traits: ["High organic matter", "Retains moisture"],
					color: "#49372b",
					textColor: "#ffffff",
			},
			"Chalk Soil": {
					description: "Chalk soil is highly alkaline and may not support acid-loving plants.",
					traits: ["Alkaline", "May show white lumps"],
					color: "#eee8d5",
					textColor: "#38352d",
			},
			"Loam Soil": {
					description: "Loam is a mixture of sand, silt, and clay, ideal for most plants and well-draining.",
					traits: ["Fertile", "Good drainage", "Easy to work with"],
					color: "#6b4f35",
					textColor: "#ffffff",
			},
			// Indian Soil Types
			"Alluvial Soil": {
					description: "Found in northern plains, rich in potash, and supports crops like wheat and maize.",
					traits: ["Fertile", "Varies from sandy loam to clay"],
					color: "#b58b54",
					textColor: "#2f2111",
			},
			"Black Soil": {
					description: "Found in Deccan Plateau, clayey and rich in iron; ideal for cotton.",
					traits: ["Moisture-retaining", "Rich in iron"],
					color: "#3e3a35",
					textColor: "#ffffff",
			},
			"Red and Yellow Soil": {
					description: "Located in the Deccan Plateau, rich in iron but generally less fertile.",
					traits: ["Deficient in nitrogen", "Supports millets and oilseeds"],
					color: "#b85c38",
					textColor: "#ffffff",
			},
			"Laterite Soil": {
					description: "Typical of monsoon climates; low in fertility but suitable for cashew cultivation.",
					traits: ["Rich in iron and aluminum", "Responsive to fertilizers"],
					color: "#9c4a32",
					textColor: "#ffffff",
			},
			"Mountain Soil": {
					description: "Found in forested areas, varies in texture; fertile in lower valleys.",
					traits: ["Acidic in snowbound areas", "Fertile in lower regions"],
					color: "#7d8b63",
					textColor: "#ffffff",
			},
			"Peaty and Marshy Soil": {
					description: "Found in heavy rainfall regions, rich in organic matter.",
					traits: ["Heavy and black", "Supports vegetation"],
					color: "#4d5940",
					textColor: "#ffffff",
			},
			"Desert Soil": {
					description: "Sandy and low moisture; found in western Rajasthan.",
					traits: ["Saline", "Low water retention"],
					color: "#d6ad68",
					textColor: "#30220e",
			},
			"Saline and Alkaline Soil": {
					description: "High in salts, mainly found in arid regions.",
					traits: ["Infertile", "Requires reclamation"],
					color: "#9eb8bc",
					textColor: "#24383b",
			},
	};

	const handleChipClick = (type) => {
		setSelectedSoilType(type);
	};

	const selectedSoil = selectedSoilType ? soilData[selectedSoilType] : null;

return (
	<>
			{isOpen && (
					<div className="popup">
							<div className="popup-content">
									<button type="button" className="close" onClick={onClose} aria-label="Close soil types">&times;</button>
									<h2>Soil Types</h2>
									<p>Soil is a natural resource categorized into different types, each with distinct characteristics.</p>
									<div className="soil-types">
											{Object.entries(soilData).map(([type, soil]) => (
													<button
															type="button"
															key={type}
															className={`soil-chip${selectedSoilType === type ? ' selected' : ''}`}
															style={{ '--soil-color': soil.color, '--soil-text-color': soil.textColor }}
															onClick={() => handleChipClick(type)}
															aria-pressed={selectedSoilType === type}
													>
															{type}
													</button>
											))}
									</div>

									{selectedSoil && (
											<div className="soil-details" key={selectedSoilType} aria-live="polite">
													<div className="soil-details-heading">
															<span
																	className="soil-color-swatch"
																	style={{ backgroundColor: selectedSoil.color }}
																	aria-hidden="true"
															/>
															<h3>{selectedSoilType}</h3>
													</div>
													<p>{selectedSoil.description}</p>
													<div className="soil-traits" aria-label={`${selectedSoilType} characteristics`}>
															{selectedSoil.traits.map((trait) => (
																	<span className="soil-trait" key={trait}>{trait}</span>
															))}
													</div>
											</div>
									)}
							</div>
					</div>
			)}
	</>
);
};

export default SoilPopup;
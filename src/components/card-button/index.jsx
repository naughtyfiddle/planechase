import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function CardButton(props) {
	return (
		<button className="card-button">
			<img
				src={_.get(props, 'card.url', '../static/img/card-back.jpg')}
				alt={_.get(props, 'card.name', 'No card to display')}
				onClick={props.onClick}
			/>
			{ props.label ? (
				<div className="card-button-label">
					<div className="center-vertical">
						{props.label}
					</div>
				</div>
			) : null }
		</button>
	);
}

CardButton.propTypes = {
	card: PropTypes.shape({
		name: PropTypes.string,
		url: PropTypes.string
	}),
	onClick: PropTypes.func.isRequired,
	label: PropTypes.string
};

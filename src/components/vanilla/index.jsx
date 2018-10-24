import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import produce from 'immer';

import VanillaDeck from './partials/vanilla-deck';
import Pinboard from './partials/pinboard';

export default class Vanilla extends React.Component {

	static propTypes = {
		deck: PropTypes.object
	}

	constructor(props) {
		super(props);

		this.state = {
			deckCards: _.clone(
				_.get(props, 'deck.cards', [])
			),
			pinnedCards: [],
			hoveredPinnedCard: null
		};
	}

	planeswalk = () => {
		this.setState(
			produce((draft) => {
				draft.deckCards.push(draft.deckCards.shift());
			})
		);
	}

	shuffle = () => {
		this.setState((prevState) => ({
			deckCards: _.shuffle(prevState.deckCards)
		}));
	}

	pinCard = () => {
		this.setState(
			produce((draft) => {
				draft.pinnedCards.push(
					draft.deckCards.shift()
				);
			})
		);
	}

	unpinCard = (card) => {
		this.setState(
			produce((draft) => {
				draft.deckCards.push(card);
				_.remove(draft.pinnedCards, (pinnedCard) => pinnedCard.id === card.id);
			})
		);
	}

	setHoveredPinnedCard = (card) => {
		this.setState({hoveredPinnedCard: card});
	}

	render() {
		return (
			<>
				<VanillaDeck
					cards={this.state.deckCards}
					planeswalk={this.planeswalk}
					shuffle={this.shuffle}
					pinCard={this.pinCard}
					topCardOverride={this.state.hoveredPinnedCard}
				/>
				<Pinboard
					cards={this.state.pinnedCards}
					unpinCard={this.unpinCard}
					setHoveredPinnedCard={this.setHoveredPinnedCard}
				/>
			</>
		);
	}
}
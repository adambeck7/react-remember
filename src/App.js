import React, { Component } from 'react';
import dog from './dog.json';
import Wrapper from './Components/Wrapper';
import DogCard from './Components/dogCard';
import { Jumbotron, Button } from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    currentScore: 0,
    highScore: 0,
    message: "Click any image to begin, but don't click it again or you lose.",
    dog: dog,
    unselectedDogs: dog
  };
  //shuffle function
  shuffle = array => {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  };

  //reset state when 'start over' button is clicked
  handleButtonClick = e => {
    e.preventDefault();
    this.setState({
      currentScore: 0,
      highScore: 0,
      message:
        "Click any image to begin, but don't click it again or you lose.",
      allDogs: dog,
      unselectedDogs: dog
    });
  };

  //selectdog is called by onClick event in dogCard.js and receives dog parameter
  selectDog = selectCharName => {
    //find the first element in unselectedDogs array that satisfies the condition if no match then findDog will equal undefined
    const findDog = this.state.unselectedDogs.find(
      char => char.dogName === selectCharName
    );

    //if no dog found in the unselectedDogs array, setState
    if (findDog === undefined) {
      this.setState({
        message: "You've already clicked that dog!",
        highScore:
          this.state.currentScore > this.state.highScore
            ? this.state.currentScore
            : this.state.highScore,
        currentScore: 0,
        allDogs: dog,
        unselectedDogs: dog
      });
    }
    //If dog is found in unselectedDogs array create a new array
    else {
      const newunselectedDogs = this.state.unselectedDogs.filter(
        char => char.dogName !== selectCharName
      );

      this.setState({
        message: 'Great job!',
        currentScore: this.state.currentScore + 1,
        allDogs: dog,
        unselectedDogs: newunselectedDogs
      });
    }

    this.shuffle(dog);
  };

  render() {
    return (
      <div>
        <div className="App">
          <Jumbotron>
            <h2 className="App-title">React Remember</h2>
            <nbsp />
            <p className="message">{this.state.message}</p>
            <p className="message">Current Score: {this.state.currentScore}</p>
            <p className="message">Top Score: {this.state.highScore}</p>
            <Button color="danger" onClick={this.handleButtonClick}>
              Start Over{' '}
            </Button>
          </Jumbotron>
        </div>
        <Wrapper>
          {this.state.dog.map(dog => (
            <DogCard
              key={dog.id}
              dogName={dog.dogName}
              image={dog.image}
              currentScore={this.state.currentScore}
              selectDog={this.selectDog}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;

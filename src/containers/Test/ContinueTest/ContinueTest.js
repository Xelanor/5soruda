import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";

import Question from '../../../components/Question/Question'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { TestResult } from '../../../components/Utils/PerformanceEvaluation'

class ContinueTest extends Component {
  state = {
    questions: [],
    givenAnswers: {},
    questionCount: 1,
    testStarted: false,
    testFinished: false,
    loading: false,
    testId: null,
  }

  componentDidMount() {
    axios.get('/api/tests/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          questions: response.data.questions,
          givenAnswers: response.data.givenAnswers,
          testId: this.props.match.params.id,
          testStarted: true
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  answerClickedHandler = (answer) => {
    const oldCount = this.state.questionCount

    const updatedGivenAnswers = {
      ...this.state.givenAnswers
    }
    updatedGivenAnswers[oldCount] = answer
    this.setState({
      givenAnswers: updatedGivenAnswers
    })

    const givenAnswers = {
      updatedGivenAnswers: updatedGivenAnswers
    }

    axios.post('/api/tests/update-answers/' + this.state.testId, givenAnswers)
      .then(res => console.log(res))
      .catch((error) => { console.log(error); })
  }

  nextQuestionHandler = () => {
    if (this.state.questionCount === this.state.questions.length) {
      this.setState({ testFinished: true, testStarted: false })
    }
    this.setState({
      questionCount: this.state.questionCount + 1,
    })
  }

  prevQuestionHandler = () => {
    if (this.state.questionCount > 1) {
      this.setState({
        questionCount: this.state.questionCount + -1,
      })
    }
  }

  render() {
    let page
    if (this.state.loading) {
      page = <Spinner />
    }
    else if (this.state.testStarted) {
      page = <Question
        questionNumber={this.state.questionCount}
        questions={this.state.questions}
        answerClicked={this.answerClickedHandler}
        givenAnswers={this.state.givenAnswers}
        class={this.classHandler}
        nextQuestion={this.nextQuestionHandler}
        prevQuestion={this.prevQuestionHandler}
      />
    } else if (this.state.testFinished) {
      page = <TestResult questions={this.state.questions} givenAnswers={this.state.givenAnswers} />
    }
    return (
      <div className="container">
        {page}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(ContinueTest);
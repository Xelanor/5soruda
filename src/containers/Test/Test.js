import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";


import Question from '../../components/Question/Question'
import './Test.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import { TestResult } from '../../components/Utils/PerformanceEvaluation'

class Test extends Component {
  state = {
    questions: [],
    givenAnswers: {},
    questionCount: 1,
    testStarted: false,
    testFinished: false,
    loading: false,
    testId: null,
    notEnoughQuestion: false
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

  testCreateHandler = async () => {
    this.setState({ loading: true })
    const questionAmount = 10
    let questionList = []
    let userTestsList = []
    let userSolvedQuestionList = []
    let userCanSolveQuestionList = []
    let n = 1
    await axios.get('/api/questions') // Bütün Soruları AL
      .then(res => {
        if (res.data.length > 0) {
          res.data.map(q => {
            questionList.push(q._id)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    await axios.get('/api/users/' + this.props.auth.user.id) // Kullanıcının Testlerini Al
      .then(res => {
        if (res.data.tests.length > 0) {
          res.data.tests.map(q => {
            userTestsList.push(q)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    for (let i in userTestsList) {
      await axios.get('/api/tests/' + userTestsList[i]) // Kullanıcının Çözdüğü Soruları Bul
        .then(res => {
          res.data.questions.map(q => {
            userSolvedQuestionList.push(q.question)
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }
    for (let i in questionList) {
      if (!(userSolvedQuestionList.includes(questionList[i])) && (n !== questionAmount + 1)) {
        userCanSolveQuestionList.push(questionList[i])
        n += 1
      }
    }
    let testArray = {
      givenAnswers: {},
      questions: [],
      user: this.props.auth.user.id
    }
    for (let n in userCanSolveQuestionList) {
      let i = parseInt(n) + 1
      let updatedArray
      updatedArray = {
        ...testArray.givenAnswers
      }
      updatedArray[i] = null
      testArray.givenAnswers = updatedArray

      testArray.questions.push({
        question: userCanSolveQuestionList[n],
        questionNumber: i
      })
    }

    if (userCanSolveQuestionList < questionAmount) {
      this.setState({ loading: false, notEnoughQuestion: true })

    } else {
      let testId
      await axios.post('/api/tests/add', testArray)
        .then(res => testId = res.data)
        .catch((err) => { console.log(err) })

      const postToUserArray = {
        id: this.props.auth.user.id,
        test: testId
      }

      await axios.post('/api/tests/add-test-to-user', postToUserArray)
        .then(res => console.log(res))
        .catch((error) => { console.log(error); })

      let updatedState = {}

      for (let n in userCanSolveQuestionList) {
        await axios.get('/api/questions/' + userCanSolveQuestionList[n])
          .then(res => {
            let updatedArray
            let questionArray
            let i = parseInt(n) + 1
            updatedState = [
              ...this.state.questions
            ]
            questionArray = {
              question: res.data,
              questionNumber: i
            }
            updatedState.push(questionArray)

            updatedArray = {
              ...this.state.givenAnswers
            }
            updatedArray[i] = null
            this.setState({ questions: updatedState, givenAnswers: updatedArray })
          })
          .catch((error) => {
            console.log(error);
          })
      }
      this.setState({ testStarted: true, loading: false, testId: testId._id })
    }
  }

  render() {
    const { user } = this.props.auth;
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
    } else if (this.state.notEnoughQuestion) {
      page = (
        <h4>Hiç Görmediğiniz Soru Kalmadı</h4>
      )
    }
    else {
      page = (
        <div>
          <h4>Hoşgeldiniz, Deneme sürümünde karşınıza matematik soruları gelecektir. </h4>
          <p>Testin Sonunda Skorunuzu görebilirsiniz.</p>
          <button className="btn btn-warning" onClick={this.testCreateHandler}>Test'e Başla</button>
        </div>
      )
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
)(Test);

import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";

import Spinner from '../../../components/UI/Spinner/Spinner'
import './ViewTest.css'

class ViewTest extends Component {
  state = {
    questions: null,
    givenAnswers: null,
    testOwner: null,
  }

  componentDidMount() {
    axios.get('/api/tests/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          questions: response.data.questions,
          givenAnswers: response.data.givenAnswers,
          testOwner: response.data.user
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    let page
    if (this.state.questions) {
      this.state.testOwner === this.props.auth.user.id ?
        page = this.state.questions.map(question => {
          return (
            <div className="QuestionBox" key={question._id}>
              <p><strong>Soru Numarası: </strong>{question.questionNumber}</p>
              <p><strong>Soru: </strong>{question.question.content}</p>
              <p><strong>Verilen Cevap: </strong>{this.state.givenAnswers[question.questionNumber] || "Boş"}</p>
              <p><strong>Doğru Cevap: </strong>{question.question.rightAnswer}</p>
            </div>
          )
        }) : page = <h5>Bu Sayfayı Görüntüleme Yetkin Yok!</h5>
    } else {
      page = <Spinner />
    }

    return (
      <div className="center">
        <h1>Merhaba, {this.props.auth.user.name}</h1>
        <h4>Çözdüğün testin detaylarını aşağıda bulabilirsin.</h4>
        {page}
      </div >
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(ViewTest);
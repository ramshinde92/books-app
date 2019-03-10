import React, { Component } from "react";
import bookService from "../services/bookService";

class Discover extends Component {
  state = {
    categories: [],
    books: [
      {
        image_url:
          "https://images.blinkist.com/images/books/5c570ea26cee070008d6c880/3_4/640.jpg",
        id: "5c5ae9fc608b273a52570422",
        category_id: "5c5ae8a3608b273a5257041e",
        title: "Audax ut aer explicabo",
        content:
          "At libero molestiae ipsa dolores. Est et sint. Quis minus ut et reprehenderit. Sed fugiat totam aspernatur ex molestiae numquam. Voluptatem quos sequi fugit. Est aut dolorem ut sed voluptatibus. Voluptas et eum amet. Et aliquam beatae sunt sunt dolorem cumque rerum. Incidunt beatae dolor adipisci corporis asperiores. Eos non occaecati commodi molestiae. Sunt sed est ad enim modi sit veniam. Consequatur beatae rerum placeat neque nihil expedita. Temporibus nesciunt animi quo eum tempore in. Vel fugiat rem. Omnis dolor pariatur nostrum incidunt quisquam eaque. Sit esse cupiditate ut cum sequi nesciunt. Dolores rerum architecto dolor accusamus incidunt aperiam. Atque nihil sit itaque perspiciatis cumque. Commodi eum molestias magni placeat asperiores. Distinctio et ut quos vero et. Dolorem ut autem sit. Velit et voluptas cumque rerum."
      },
      {
        image_url:
          "https://images.blinkist.com/images/books/5c57048a6cee070008f61115/3_4/640.jpg",
        id: "5c5ae9fc608b273a52570423",
        category_id: "5c5ae8a3608b273a5257041e",
        title: "Adultus annus socius coma",
        content:
          "Sed et architecto quasi nihil fugiat ut totam. Fuga accusantium id optio accusamus et. Veritatis ut ea dolore. Amet maiores sint omnis explicabo totam qui itaque. Vitae in laboriosam dolores quasi. Quas laborum aperiam animi. Quam vitae iure. Dolorem id animi reprehenderit sunt eligendi repudiandae. Et sapiente rem est eius facere iusto recusandae. Quas distinctio rerum excepturi at atque. Rerum at tempora dignissimos sed dolore beatae voluptas. At quia repellendus optio quae eos nobis. Laborum ad architecto voluptates minima qui. Aperiam provident iste excepturi occaecati consectetur. Vel et hic autem ut harum ut. Exercitationem molestiae quis doloribus officiis ad est iusto. Quae alias aut consequuntur. Minus consectetur quo magnam recusandae saepe suscipit dolorem. Quo ea incidunt impedit odit. Aliquid a fuga hic. Eum blanditiis ut assumenda illum."
      },
      {
        image_url:
          "https://images.blinkist.com/images/books/5c56fb116cee070008d6c85f/3_4/640.jpg",
        id: "5c5ae9fc608b273a52570424",
        category_id: "5c5ae8a3608b273a5257041e",
        title: "Congregatio vulnus similique et",
        content:
          "Saepe est quaerat dolorum incidunt earum. Itaque omnis quidem similique laborum. Qui qui ipsum debitis inventore ratione. Hic iusto et fugiat harum beatae officiis. Aut est id error harum. Quia molestias magnam ad earum repellendus eius aliquam. Cum et quos iusto id sed. Velit ipsum nulla dolores iste. Omnis ut labore. Quod placeat facilis dolorum et ipsa. Libero suscipit est aut et. In laudantium accusantium molestias. Nesciunt alias ducimus ab sed distinctio sit. Deserunt aut sed non modi. Saepe ut deserunt quam maxime delectus non. Quasi aspernatur omnis sint. Nihil maiores magni voluptates quos ullam. Eum quo veniam quasi voluptatem tempore. Eum voluptates rerum. Sapiente dolorem nesciunt. Aut vitae provident. Ut commodi id atque consequatur."
      },
      {
        image_url:
          "https://images.blinkist.com/images/books/5c5060e06cee070007d816be/3_4/640.jpg",
        id: "5c5ae9fc608b273a52570425",
        category_id: "5c5ae8a3608b273a5257041e",
        title: "Conduco aliqua ambulo demergo",
        content:
          "Non rerum veritatis eos doloribus. Vel omnis ratione expedita quae. Distinctio vitae ratione et aspernatur at. Facere eligendi unde. Odio itaque laudantium fugiat eos quia. Et voluptas ut illo aperiam. Et in qui aliquam inventore et dolores. Dignissimos doloribus quas. Et voluptas eos debitis unde odit. Ea pariatur est cumque. Dolores maiores aut voluptatem reprehenderit rerum. Nostrum accusamus quasi rerum repellat qui. Modi aut alias. Omnis mollitia laudantium fugiat id sed. Porro corrupti dolore. Debitis est quod. Et officia voluptatum. Cum ut vitae ullam aut eius. Nesciunt repellendus sint error aliquid voluptatem inventore. Sunt sed vitae quo quasi."
      }
    ]
  };

  componentDidMount() {
    bookService.getBooks(categories => {
      this.setState({ categories });
    });
  }

  render() {
    return (
      <div className="container container--alignStart">
        <div className="grid-col-left">
          <ul>
            {this.state.categories.map(el => {
              return <li key={el.id}>{el.title}</li>;
            })}
          </ul>
        </div>
        <div className="grid-col-right">
          <ul>
            {this.state.books.map(el => {
              return (
                <li key={el.id}>
                  <p>{el.title}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Discover;

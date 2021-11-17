import { Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import PageWrapper from "../components/PageWrapper"

const Adopt = () => {
  const { image } = useStaticQuery(graphql`
    {
      image: file(relativeDirectory: { eq: "bungle" }, name: { eq: "test1" }) {
        childImageSharp {
          gatsbyImageData(aspectRatio: 1.5)
        }
      }
    }
  `)
  return (
    <PageWrapper title="Adopt">
      <GatsbyImage image={getImage(image)} />
      <Typography variant="lead" paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quas,
        neque id distinctio aliquam dignissimos facilis dicta nemo incidunt
        earum culpa nesciunt blanditiis, ut, animi sit debitis iure! Dolor
        praesentium omnis at. Hic eos totam voluptate iure, saepe, ipsam culpa
        et explicabo delectus fuga facere dolor natus itaque alias nemo?
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta
        ipsa placeat. Ipsum sapiente quia unde consectetur nobis nostrum porro
        sed quasi, ducimus at laboriosam nisi id vero dolor hic minima, autem
        obcaecati. Consequatur, reprehenderit earum. Rerum quam, sit omnis nemo
        nihil culpa pariatur expedita optio iste libero iure laudantium beatae
        quisquam dolorem provident facilis vero quo neque eveniet magni enim.
        Magni veritatis dignissimos sed sapiente animi? Quam amet laborum, velit
        qui excepturi delectus eos cupiditate rem culpa, natus, enim aliquam cum
        quaerat eveniet laboriosam dignissimos sint nesciunt nam! Quo, officiis
        in molestiae amet vero dolor maxime recusandae dolorum voluptate?
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolor impedit
        nemo quia necessitatibus iusto quis saepe repellendus voluptatibus,
        magni qui mollitia exercitationem eaque nihil ullam assumenda corporis
        unde? Ab voluptatum tempora in magnam enim eveniet, incidunt quis?
        Inventore fuga quasi, veritatis eaque iusto itaque provident sed illum
        sapiente quos voluptas sunt minus quam consequuntur quibusdam
        consequatur molestiae numquam in id ipsam officia adipisci modi facilis
        molestias. Rem libero assumenda minus eum praesentium tenetur qui nihil
        fugiat rerum. Quis sint sed soluta quidem eveniet tenetur accusamus ut
        blanditiis voluptatem pariatur doloribus omnis assumenda quia esse,
        aliquid neque minus, eius voluptates suscipit illum impedit tempora.
        Mollitia facilis perferendis facere, explicabo libero similique nisi, at
        voluptatem delectus nam laboriosam aperiam quaerat dolorum magnam
        accusantium fugiat vero doloremque eius, natus ullam ipsam aliquam?
        Vitae illo aperiam fugiat sapiente nulla placeat ducimus distinctio amet
        in possimus maxime consectetur dicta corrupti natus corporis voluptatem
        vero fugit voluptate officiis, eaque, a rem! Natus autem praesentium cum
        temporibus provident voluptates harum delectus? Repellat eos laudantium
        corrupti pariatur commodi perspiciatis dignissimos odio officia,
        voluptate ab in maxime impedit ullam aliquam possimus, iusto
        necessitatibus iste odit nesciunt assumenda ipsa architecto? Atque nulla
        fugit sed ducimus magnam quod cupiditate rem.
      </Typography>
    </PageWrapper>
  )
}

export default Adopt

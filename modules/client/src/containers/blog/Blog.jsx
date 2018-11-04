// React
import React from 'react'
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Label } from 'react-bootstrap';
// Markdown
import Remarkable from 'remarkable';

const loadHeader = (props) => {
    const { title, link } = props
    /* Return Blog header */
    if (link) {
        /*
         * Import this function in `Blogs.jsx`
         * pass a link and when clicked on the 
         * title you'll be able to view.
         */
        return (
        <h1>
		    <Link to={link}>
			    {title}
		    </Link>
		</h1>
        );
    } else {
        return (
        <h1>
		    {title}
		</h1>		
        )
    }
}

// Allow auth user to edit their blog
const loadEdit = (props) => {
    if (props.authenticated) {
        return (
        <Link to={"/blog/"+ props.slug + "/edit"}>
		    <FontAwesome name='pencil' className="button-edit" />
		</Link>
        );
    } else {
        return (null);
    }
}

// if blog has not been published `loadDraft()`
const loadDraft = (props) => {
    if (!props.published) {
         /* Show "Draft" label on non-published blogs */
        return (
        <Label bsStyle="default" className="label-draft">
		    Draft
		</Label> 
        );
    } else {
        return (null);
    }
}

// `loadBody()` w/ markdown
const loadBody = (props) => {
    /* Abbreviate the blog to the number of words passed as a abbreviated prop. */
    props.body.split(" ").splice(0, props.abbreviated).join(" ");
    if (props.abbreviated && props.body > props.abbreviated) {
        props.body = props.abbreviated
    }
    // use markdown in html
    const md = new Remarkable({html: true});
    const markdown = md.render(props.body);
    return (
        // great read `https://zhenyong.github.io/react/tips/dangerously-set-inner-html.html`
        <div dangerouslySetInnerHTML={{__html:markdown}} />
    )
}

const loadReadMore = (props) => {
    props.body.split(" ").splice(0, props.abbreviated).join(" ");
    if (props.abbreviated && props.body > props.abbreviated) {
        return (
        <div>
		    <Link to={props.link}
			  className="readMore"> Read more...</Link>
		</div>
        )
    }
}

function Blog() {
  return (
    <div>
    <article>
        {loadHeader()}
        {loadEdit()}
        {loadDraft()}
        <div>
        {loadBody()}
        {loadReadMore()}
        </div>
    </article>  
    </div>
  )
}

export default Blog;
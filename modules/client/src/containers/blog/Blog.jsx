import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'react-bootstrap';

import Remarkable from 'remarkable';

import FontAwesome from 'react-fontawesome';

export default class Blog extends Component {
    loadBlogHeader () {
	/* Return Blog header */
	if (this.props.link ) {
	    /* BlogList will use this component, and pass a link to it
	       so you can click on the title and view it */
	    
	    return (
		<h1>
		    <Link to={this.props.link}>
			{this.props.title}
		    </Link>
		</h1>
	    );
	} else {
	    /* Blog detail does not pass a link. */
	    return (
		<h1>
		    {this.props.title}
		</h1>		
	    );
	}
    }

    loadBlogEdit () {
	if (this.props.authenticated ) {
	    /* If user is autheticated - show him the edit button. */
	    return (
		<Link to={"/blog/"+this.props.slug+"/edit"}>
		    <FontAwesome name='pencil' className="button-edit" />
		</Link>
	    );
	} else {
	    return (
		null
	    );
	}
    }

    loadDraftLabel () {
	if (!this.props.published ) {
	    /* Show "Draft" label on non-published blogs */
	    return (
		<Label bsStyle="default" className="label-draft">
		    Draft
		</Label>
	    );
	} else {return (null);}
    }
    

    loadBody () {
	var body = this.props.body;
	/* Truncate the blog to the number of words passed as a truncate prop. */
	var truncated = body.split(" ").splice(0,this.props.truncate).join(" ");
	if (this.props.truncate && body > truncated) {
	    body = truncated;
	}

	/* Turn markdown into html */
	const md = new Remarkable({html: true});
	const markdown = md.render(body);
	return (
	    <div dangerouslySetInnerHTML={{__html:markdown}} />
	);
    }

    
    loadReadMore () {
	/* Add "read more..." link at the end of truncated blogs. */
	var body = this.props.body;	
	var truncated = body.split(" ").splice(0,this.props.truncate).join(" ");
	if (this.props.truncate  && body > truncated) {
	    return (
		<div>
		    <Link to={this.props.link}
			  className="readMore"> Read more...</Link>
		</div>
	    );
	} else {
	    return (
		<div>
		</div>
	    );
	}
    }

    Footer () {
	const { tags, category } = this.props;
	/* If there's no tags and no category - return empy div */
    if (!(tags > 0 || category))
    { 
        return (
            <div></div>
        ); 
    }

	var tagItems = "";
	var categoryItem = "";

	/* If there are some tags - generate tag labels  */
	if (tags && tags.length > 0) {
	    tagItems = tags.map((tag) => {
		return (
		    <span key={tag.slug}>
			<Link to={'/tag/' + tag.slug}>
			    <Label bsStyle="default">
				{tag.title}
			    </Label>
			    &nbsp;
			</Link>
		    </span>
		);
	    });
	}

	/* If there's a category - generate a category label */
	if (category) {
	    categoryItem = (
		<span>
		    <Link to={'/category/' + category.slug}>
			<Label bsStyle="default" className="label-category">
			    {category.title}
			</Label>
		    </Link>
		    &nbsp;
		</span>
	    );
	}

	return (
	    <div className="blog-footer">
		{ categoryItem }		
		{ tagItems }
		<div className="right">
		    <Link className="black" to={'http://rayalez.com'} >
			@rayalez
		    </Link>
		</div>
	    </div>
	);
    }

    render() {
	return (
	    <div>
		<article className="blog panel panel-default">
		    {this.loadBlogEdit()}
		    {this.loadDraftLabel()}
		    {this.loadBlogHeader()}
		    <hr/>

		    <div>
			{this.loadBody()}
			
			{this.loadReadMore()}			
		    </div>
		    <br/>
		    {this.Footer()}			
		</article>
	    </div>	    
	);
    }
}
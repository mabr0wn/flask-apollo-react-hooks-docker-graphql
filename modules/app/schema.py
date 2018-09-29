from collections import namedtuple, OrderedDict
from graphql import (
    GraphQLField, GraphQLNonNull, GraphQLArgument,
    GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLString,
    GraphQLSchema
)

Blog = namedtuple('Blog', 'id title text')

BlogList = namedtuple('BlogList', 'blogs')

BlogType = GraphQLObjectType(
    name='Blog',
    fields=lambda: {
        'id': GraphQLField(
            GraphQLNonNull(GraphQLString),
        ),
        'title': GraphQLField(
            GraphQLString
        ),
        'text': GraphQLField(
            GraphQLString
        )
    }
)

BlogListType = GraphQLObjectType(
    name='BlogList',
    fields=lambda : {
        'blogs': GraphQLField(
            GraphQLList(BlogType),
            resolver=lambda blog_list, *_: get_blogs(blog_list),
        )
    }
)

blog_data = OrderedDict({
    '1': Blog(id='1', title='GraphQL', text='Rocks!'),
    '2': Blog(id='2', title='Flask + React', text='Racks!')
})

def get_blog_list():
    return BlogList(blogs=blog_data.keys())

def get_blog(id):
    return blog_data.get(id)

def get_blogs(blog_list):
    return map(get_blog, blog_list.blogs)

def get_blog_single():
    return Blog(id=1, title='GraphQL', text='Rocks!')

def add_blog(title, text):
    blog = Blog(id=str(len(blog_data) + 1), title=title, text=text)
    blog_data[blog.id] = blog
    return blog

def toggle_blog(id):
    cur_blog = blog_data[id]
    blog = Blog(id=id, title=cur_blog.title, text=cur_blog.text)
    blog_data[id] = blog
    return blog

QueryRootType = GraphQLObjectType(
    name='Query',
    fields=lambda: {
        'test': GraphQLField(
            GraphQLString,
            args={
                'who': GraphQLArgument(GraphQLString)
            },
            resolver=lambda root, args, *_:
                'Hello %s' % (args.get('who') or 'World')
        ),
        'blog': GraphQLField(
            BlogType,
            resolver=lambda root, args, *_: get_blog_single(),
        ),
        'blogList': GraphQLField(
            BlogListType,
            resolver=lambda root, args, *_: get_blog_list(),
        )
    }
)


MutationRootType = GraphQLObjectType(
    name='Mutation',
    fields=lambda: {
        'addBlog': GraphQLField(
            BlogType,
            args={
                'text': GraphQLArgument(GraphQLString)
            },
            resolver=lambda root, args, *_: add_blog(args.get('text'))
        ),
        'toggleBlog': GraphQLField(
            BlogType,
            args={
                'id': GraphQLArgument(GraphQLString)
            },
            resolver=lambda root, args, *_: toggle_blog(args.get('id'))
        )
    }
)

Schema = GraphQLSchema(QueryRootType, MutationRootType)
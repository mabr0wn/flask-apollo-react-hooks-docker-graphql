# Graphene
import graphene
from graphene import relay, String
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType, utils
from datetime import datetime
# Local
from .utils import input_to_dictionary
from .models import Blog as BlogModel
from .models import User as UserModel
from .models import Role as RoleModel
from .database import db_session


class Blog(SQLAlchemyObjectType):
    class Meta:
        model = BlogModel
        interfaces = (relay.Node, )


class BlogConnection(relay.Connection):
    class Meta:
        node = Blog

# Create a generic class to mutualize description of planet attributes for both queries and mutations
class UserAttribute:
    username = graphene.String(description='username of user')

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )

class CreateUserInput(graphene.InputObjectType, UserAttribute):
    """Arguments to create a planet."""
    pass

class UserConnections(relay.Connection):
    class Meta:
        node = User

class CreateUser(graphene.Mutation):
    user = graphene.Field(lambda: User, description='User created by this mutaiton.')

    class Arguments:
        input = CreateUserInput(required=True)

    def mutate(self, info, input):
        data = input_to_dictionary(input)


        user = UserModel(**data)
        db_session.add(user)
        db_session.commit()

        return CreateUser(user=user)

class Role(SQLAlchemyObjectType):
    class Meta:
        model = RoleModel
        interfaces = (relay.Node, )


class RoleConnection(relay.Connection):
    class Meta:
        node = Role


SortEnumUser = utils.sort_enum_for_model(UserModel, 'SortEnumUser',
    lambda c, d: c.upper() + ('_ASC' if d else '_DESC'))


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allow only single column sorting
    all_users = SQLAlchemyConnectionField(
        UserConnections,
        sort=graphene.Argument(
            SortEnumUser,
            default_value=utils.EnumValue('id_asc', UserModel.id.asc())))
    # Allows sorting over multiple columns, by default over the primary key
    all_roles = SQLAlchemyConnectionField(RoleConnection)
    # Disable sorting over this field
    all_blogs = SQLAlchemyConnectionField(BlogConnection, sort=None)

class Mutations(graphene.ObjectType):
    createUser = CreateUser.Field()


schema = graphene.Schema(query=Query, types=[Blog, User, Role], mutation=Mutations)
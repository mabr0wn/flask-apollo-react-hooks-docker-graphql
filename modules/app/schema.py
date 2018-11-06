import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType, utils
from models import Blog as BlogModel
from models import User as UserModel
from models import Role as RoleModel

class Blog(SQLAlchemyObjectType):
    class Meta:
        model = BlogModel
        interfaces = (relay.Node, )

class BlogConnection(relay.Connection):
    class Meta:
        node = Blog

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )

class UserConnection(relay.Connection):
    class Meta:
        node = User

class Role(SQLAlchemyObjectType):
    class Meta:
        model = RoleModel
        interfaces = (relay.Node, )

class RoleConnection(relay.Connection):
    class Meta:
        node = Role

SortEnumUser = utils.sort_enum_for_model(UserModel, 'SortEnumUser',
    lambda c, d: c.upper() + ('ASC' if d else '_DESC'))

class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allow only single column sorting
    all_users = SQLAlchemyConnectionField(
        UserConnection,
        sort=graphene.Argument(
            SortEnumUser,
            default_value=utils.EnumValue('id_asc', UserModel.id.asc())))
    # Allows sorting over multiple columns, by default over the primary key
    all_roles = SQLAlchemyConnectionField(RoleConnection)
    # Disable sorting over this field
    all_blogs = SQLAlchemyConnectionField(BlogConnection, sort=None)

schema = graphene.Schema(query=Query, types=[Blog, User, Role])
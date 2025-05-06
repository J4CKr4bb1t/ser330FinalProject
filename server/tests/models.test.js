const { beforeEach } = require("node:test");
const User = require("../model/User");
const Blog = require("../model/Blog");

describe("Model Testing", () => {
  let user;
  let blog;

  beforeEach(() => {
    user = new User();
    blog = new Blog();
  });

  //   test("arrange_act_assert", () => {
  //     //Arrange
  //     //beforeEach
  //     //Act
  //     //what we're trying to do
  //     const user = new User();
  //     //params

  //     //Assert
  //     //how do I know that this person was created successefully?
  //     expect(value).toBe("value");
  //   });

  test("givenProperuser_MakeNewUser_RecieveNewUser", () => {
    //Arrange
    //beforeEach

    //Act
    //what we're trying to do
    user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      blogs: [], //don't actually need to see the blogs, just so any ID will do
    });
    //console.log(user);

    //Assert
    //how do I know that this person was created successefully?
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.password).toBe("password123");
    expect(user.blogs).toHaveLength(0);
  });

  test("givenProperBlog_MakeNewBlog_RecieveNewBlog", () => {
    //Arrange
    //beforeEach

    //Act
    //what we're trying to do
    user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      blogs: [], //don't actually need to see the blogs, just so any ID will do
    });

    const blog = new Blog({
      title: "Test Blog",
      desc: "This is the description of my first blog post.",
      img: "https://example.com/image.jpg",
      user: user._id,
    });
    //console.log(blog);
    //params

    //Assert
    //how do I know that this person was created successefully?
    expect(blog.title).toBe("Test Blog");
    expect(blog.desc).toBe("This is the description of my first blog post.");
    expect(blog.img).toBe("https://example.com/image.jpg");
    expect(blog.user).toBe(user._id);
    expect(blog.date).toBeInstanceOf(Date);
  });
});

const { beforeEach, afterEach } = require("node:test");
const User = require("../model/User");
const Blog = require("../model/Blog");
const app = require("../server");
const request = require("supertest");

//controllers use routes, so two birds one stone
describe("Controller Testing", () => {
  let user;
  let blog;

  beforeEach(() => {
    user = new User();
    blog = new Blog();
  });

  afterEach(() => {
    // Blog.deleteMany();
    // User.deleteMany();
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

  test("givenExistingUser_MakeNewUser_RecieveUserAlreadyMade", async () => {
    //Arrange
    //beforeEach

    //Act
    //what we're trying to do
    const userInfo = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      blogs: [], //don't actually need to see the blogs, just so any ID will do
    };

    const res = await request(app).post("/api/users/signup").send(userInfo);

    //Assert
    expect(res.statusCode).toBe(400);
    //expect(res.body.user).toBeDefined();
    //expect(res.body.user.name).toBe("John Doe");

    const userInDB = await User.findOne({ name: "John Doe" });
    expect(userInDB).not.toBeNull();
  });

  test("UserInDB_GetAllUsers_ViewUsers", async () => {
    //Arrange
    //beforeEach

    //Act
    //what we're trying to do
    // const userInfo = {
    //   name: "John Doe",
    //   email: "john@example.com",
    //   password: "password123",
    //   blogs: [], //don't actually need to see the blogs, just so any ID will do
    // };

    const res = await request(app).get("/api/users/");

    //console.log(res.body);
    //Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.users).toBeDefined();
  });

  //TODO ensure new
  test("givenNewUser_MakeNewUser_RecieveNewUser", async () => {
    //Arrange
    //beforeEach

    //Act
    //what we're trying to do
    const userInfo = {
      name: "Jane Doe5",
      email: "jane5@example.com",
      password: "password1234",
      blogs: [], //don't actually need to see the blogs, just so any ID will do
    };

    const res = await request(app).post("/api/users/signup").send(userInfo);

    //Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.name).toBe("Jane Doe5");

    // const userInDB = await User.findOne({ name: "Jane Doe" });
    // const userID = userInDB._id;
    // expect(userInDB).not.toBeNull();

    //remove to ensure user is new every time
    await User.findByIdAndDelete(res.body.user._id);
  });

  test("givenExistingUser_Login_RecieveConfirmation", async () => {
    //Arrange
    //beforeEach

    //Act
    //what we're trying to do
    const userInfo = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      blogs: [], //don't actually need to see the blogs, just so any ID will do
    };

    const confirmation = await request(app)
      .post("/api/users/signup")
      .send(userInfo);

    const res = await request(app).post("/api/users/login").send({
      email: "john@example.com",
      password: "password123",
    });

    //Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe("john@example.com");
  });

  //TODO ensure new
  test("givenUser_uploadNewBlog_ConfirmNewBlog", async () => {
    //Arrange
    //beforeEach
    //ensures we have valid user- he should already be in DB but better safe than sorry

    const testuser = await User.findOne();

    //Act
    //what we're trying to do
    const blogInfo = {
      title: "Test Blog 3",
      desc: "This is a blog post! Yay!",
      img: "https://example.com/image.jpg",
      user: testuser._id,
    };

    const res = await request(app).post("/api/blogs/add").send(blogInfo);

    //Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.blog.title).toBe("Test Blog 3");
  });

  test("givenBlogsEcisting_retrieveBlogs_ViewNewBlogs", async () => {
    //Arrange
    //beforeEach
    //ensures we have valid user- he should already be in DB but better safe than sorry

    // const testuser = User.findOne({ name: "John Doe" });

    //Act
    //what we're trying to do
    const res = await request(app).get("/api/blogs/");
    console.log(res.body);

    //Assert
    //how do I know that this person was created successefully?
    expect(res.statusCode).toBe(200);
    expect(res.body.blogs).toBeDefined();
  });

  test("givenExistingBlog_retrieveByID_ViewNewBlogs", async () => {
    //Arrange
    //beforeEach
    //ensures we have valid user- he should already be in DB but better safe than sorry

    const testuser = await User.findOne({ name: "John Doe" });

    //Act
    //what we're trying to do
    blog = await Blog.create({
      title: "Blog 1",
      desc: "Desc",
      img: "http://img.com",
      user: testuser._id,
    });

    const res = await request(app).get(`/api/blogs/${blog._id}`);
    //console.log(res.body);
    //Assert
    //how do I know that this person was created successefully?

    expect(res.statusCode).toBe(200);
    expect(res.body.blog.title).toBe("Blog 1");
  });

  test("givenExistingBlog_updateByID_ViewNewBlogs", async () => {
    //Arrange
    //beforeEach
    //ensures we have valid user- he should already be in DB but better safe than sorry

    const testuser = await User.findOne({ name: "John Doe" });

    //Act
    //what we're trying to do
    blog = await Blog.create({
      title: "Blog 1",
      desc: "Desc",
      img: "http://img.com",
      user: testuser._id,
    });

    // newBlogInfo = { title: "Blog 2", desc: "This is words now" };

    const res = await request(app)
      .put(`/api/blogs/update/${blog._id}`)
      .send({ title: "Blog 2" });
    console.log(res.body);
    //Assert
    //how do I know that this person was created successefully?

    expect(res.statusCode).toBe(200);
    // expect(res.body.blog.title).toBe("Blog 2");
  });

  test("givenExistingBlog_deleteByID_ViewNewBlogs", async () => {
    //Arrange
    //beforeEach
    const testuser = await User.findOne({ name: "John Doe" });

    const blog = await Blog.create({
      title: "Blog to Delete",
      desc: "To be deleted",
      img: "http://img.com",
      user: testuser._id,
    });

    testuser.blogs.push(blog._id);
    await testuser.save();

    //ACT
    const res = await request(app).delete(`/api/blogs/${blog._id}`);

    //Assert
    expect(res.statusCode).toBe(200);
  });

  test("givenNonExistingBlog_deleteByID_Error", async () => {
    //Arrange
    //beforeEach
    const testuser = await User.findOne({ name: "John Doe" });

    //ACT
    const res = await request(app).delete(`/api/blogs/${testuser._id}`);

    //Assert
    expect(res.statusCode).toBe(404);
  });

  test("givenExistingBlog_getByUserID_ViewBlogs", async () => {
    //Arrange
    //beforeEach
    const testuser = await User.findOne({ name: "John Doe" });

    const blog = await Blog.create({
      title: "Blog to Delete",
      desc: "To be deleted",
      img: "http://img.com",
      user: testuser._id,
    });

    testuser.blogs.push(blog._id);
    await testuser.save();

    //ACT
    const res = await request(app).get(`/api/blogs/user/${testuser._id}`);

    //Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.user.blogs).toBeDefined();
  });
});

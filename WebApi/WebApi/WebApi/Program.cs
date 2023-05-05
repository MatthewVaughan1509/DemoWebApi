using Service.Implementations;
using Service.Interface;
using DataModel.Interfaces;
using DataModel.Implementations;
using PPM.Insights.DataModel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var services = new ServiceCollection();
builder.Services.AddTransient<IPageService, PageService>();
builder.Services.AddTransient<IPageRepository, PageRepository>();
builder.Services.AddTransient<IConnections, Connections>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
